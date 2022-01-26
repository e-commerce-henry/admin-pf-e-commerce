import React from "react";
import  './Pagination.css';


export default function Pagination({page, numberPage,setPage}){

    function pagination(e){
        if (e.target.value==="next") {
            setPage(page+1)
        } else if(e.target.value==="inicio"){
            setPage(1)
        }else if(e.target.value ==="final"){
            setPage(numberPage.length)
        }else {
            setPage(page-1)
        }
    }

    return(
        <div className='pagination_container' >
            <button
                className="boton"
                onClick={pagination}
                value="inicio"
            >⏪</button>
            <button
                className="boton"
                onClick={pagination}
                value="previous"
                disabled={page===1}
            >◀️</button>
                {  
                    numberPage.map((pag,index)=>{
                        return(
                            <div
                                key={index}
                                onClick={()=> setPage(pag)} 
                                className={page === pag ?'active':''}
                            >
                            {pag}
                        </div>
                        )
                    })
                }
            <button
                className="boton"
                onClick={pagination}
                value="next"
                disabled={page===numberPage.length}
            >▶️</button>
            <button
                className="boton"
                onClick={pagination}
                value="final" 
            >⏩</button>
        </div>
    )

}