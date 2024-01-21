import React from 'react';
import './Review.css';

function Pagination(props){
  console.log(props.classStyle);
    return(
        <nav aria-label="">
        <ul className={`pagination ${props.classStyle}`}>
        {(() => {
            if (props.currentPage  === 0) {
              return  <li class="page-item disabled"><a class="page-link" href={`#${props.currentPage+1}`} onClick={()=>props.onChangePage(props.currentPage-1)}>Anterior</a></li>
            } else{
              return   <li class="page-item"><a class="page-link" href={`#${props.currentPage+1}`} onClick={()=>props.onChangePage(props.currentPage-1)}>Anterior</a></li>

            }
    })()}
          {[...Array(props.numberPages)].map((_, index) => (
            (() => {
              if (props.currentPage === index) {
                return <li key={index} class="page-item active">
                <a className="page-link" href={`#${index+1}`} onClick={()=>props.onChangePage(index)}>{index + 1} <span class="sr-only">(current)</span></a>
              </li>
              } else{
                return <li key={index} class="page-item">
                <a className="page-link" href={`#${index+1}`} onClick={()=>props.onChangePage(index)}>{index + 1} </a>
              </li>

              }
            })()

            ))}

        {(() => {
              if (props.currentPage  === props.numberPages-1) {
                return  <li class="page-item disabled"><a class="page-link" href={`#${props.currentPage +1 }`} onClick={()=>props.onChangePage(props.currentPage+1)}>Siguiente</a></li>
              } else{
                return   <li class="page-item"><a class="page-link" href={`#${props.currentPage +1 }`} onClick={()=>props.onChangePage(props.currentPage+1)}>Siguiente</a></li>

              }
        })()}

        </ul>
      </nav>
    )
}

export default Pagination;