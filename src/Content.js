import ItemList from './ItemList';

const Content = ({items, handleCheck, handleDelete}) => {
   

    return (

        <main> 
            {items.length ? ( 
                <ItemList  // poziva iz ItemList komponente iteme
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ) : (
                <p style={{marginTop: '2rem' }}>Your list is empty </p>
            )}
        </main>
        // kod buttona handleClick 2 pozivamo argument name pomocu anonimne funckije a u zagradi dodeljujemo vrednost imena 
    )
}

export default Content
