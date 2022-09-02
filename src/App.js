import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState } from 'react';

function App() {

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

const setAndSaveItems = (newItems) => {
  setItems(newItems);
  localStorage.setItem('shoppinglist', JSON.stringify(newItems)); // cuva u lokalnoj memoriji
}

const addItem = (item) => {
  const id = items.length ? items[items.length - 1].id + 1 : 1; // ako duzina unetig slova nije nula treba da bude 1?
  const myNewItem = { id, checked: false, item}; // ckecked polje dodatog itema ce uvek biti false
  const listItems = [...items, myNewItem]; // spread operator items nam omogućava da brzo kopiramo ceo ili deo postojećeg niza ili objekta u drugi niz ili objekat.
  setAndSaveItems(listItems);

}

const handleCheck = (id) => {
  //console.log(`key: ${id}`)
  const listItems = items.map((item) => item.id === id ? { // Funkcija map() se koristi za ponavljanje niza i manipulisanje ili promenu stavki podataka. U React-u, funkcija map() se najčešće koristi za prikazivanje liste podataka u DOM-u.
      ...item,
      checked: !item.checked
  } : item);
  setItems(listItems);
}


const handleDelete = (id) => {
  // console.log(id)
  const listItems = items.filter((item) => item.id !== id) // filter ce stvoriti novi niz i on ce imati samo id-ove koji nisu jednaki id-ju itema
  setItems(listItems);
  localStorage.setItem('shoppinglist', JSON.stringify(listItems)); // cuva u lokalnoj memoriji
}

const handleSubmit = (e) => {
  e.preventDefault(); // sprecava refresh stranice
  if(!newItem) return;
  addItem(newItem);
  setNewItem('');
  //console.log('submitted');
}

  return (
    <div className="App">
        <Header title="Groceries"/>
        <AddItem 
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />
        <SearchItem
          search={search}
          setSearch={setSearch}
        />
        {/* <Header /> */}
        <Content // poziva iz Content komponente sve njegove iteme
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        <Footer length={items.length} />
    </div>
  );
}

export default App;
