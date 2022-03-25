import React, {useEffect, useState} from 'react';
import axios from 'axios';

function FuncComp() {
    const [ mytext, mytextUpdate ] = useState('셋팅된 DB 값')

    useEffect ( async () => {
        await axios.post('/post',{})
        .then( res => {
            mytextUpdate(res.data.naver)
        })
    }, [] )

    return(
        <div>
            <h3>함수형 컴포넌트</h3>
            <p>useState에 의해 컴포넌트가 새로고침 된다.</p>
            <p>post는 axios.post로 응답받는다 : {mytext}</p>
        </div>
    )
}

export default FuncComp;