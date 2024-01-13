import { useState } from "react"

function NewBook(props) {
    const [titulo, setTitle] = useState('');
    const [autor, setAuthor] = useState('');
    const [categoria, setGenre] = useState('');
    const [año, setYear] = useState('');
    const [vendedores, setSeller] = useState('');
    const [precio, setPrize] = useState('');
    const [stock, setStock] = useState('');
    const [reseñas, setReview] = useState('');

    function onClick() {
        const newBook = {
            titulo: titulo,
            autor: autor,
            categoria: categoria,
            año: año,
            vendedores: vendedores,
            precio: precio,
            stock: stock,
            reseñas: reseñas
        };
        const result = props.onAddBook(newBook);

        if (result) {
            setTitle('');
            setAuthor('');
            setGenre('');
            setYear('');
            setSeller('');
            setStock('');
            setPrize('');
            setReview('');
        }
    }

    return (
        <tr>
            <td><input className="form-control" name="titulo" value={titulo} onChange={(event) => setTitle(event.target.value)}/></td>
            <td><input className="form-control" name="autor" value={autor} onChange={(event) => setAuthor(event.target.value)}/></td>
            <td><input className="form-control" name="categoria" value={categoria} onChange={(event) => setGenre(event.target.value)}/></td>
            <td><input className="form-control" name="año" value={año} onChange={(event) => setYear(event.target.value)}/></td>
            <td><input className="form-control" name="vendedores" value={vendedores} onChange={(event) => setSeller(event.target.value)}/></td>
            <td><input className="form-control" name="precio" value={precio} onChange={(event) => setPrize(event.target.value)}/></td>
            <td><input className="form-control" name="stock" value={stock} onChange={(event) => setStock(event.target.value)}/></td>
            <td><input className="form-control" name="reseñas" value={reseñas} onChange={(event) => setReview(event.target.value)}/></td>
            <td><button className="btn btn-primary" onClick={onClick}>Add Book</button></td>
        </tr>
    )
}

export default NewBook;