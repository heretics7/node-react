import React, {useEffect, useState} from 'react'; 
import axios from 'axios';
import $ from 'jquery';

const Interview = (props) => {   
    //함수형 컴포넌트에서는 this 주의할 것.
    let [ interviewId, interviewIdUpdate ] = useState([]);
    const [ typeData, insertDB ] = useState(0);   

    const interviewDataSetting = async () => {
        
        axios(
            {
                url : `/reactinterview?type=${props.botable}`,
                method : 'POST',
            }
        )
        .then( // 통신은 성공
            (result) => { 
                //select 전용
                try{ // 데이터도 잘 받음
                    interviewIdUpdate([...result.data]);
                    insertDB(result.data[result.data.length - 1]);
                }
                catch(err){ console.log("result 타입 확인할 것 :"+err.message+"/"+typeof result) } // 데이터 값을 받지 못함 -> DB가 비어있을 수도?
            }
        )
        .catch( e => { console.log(e +'에러로 통신 제한') } ); // 통신 실패 
    };
    useEffect( () => {  interviewDataSetting(); } , [typeData] );
    //typedata 값이 변할 때 값을 재렌더링해라

        return (

            <div>
                <h2>{ interviewId.length > 0 ? props.titlenm : "데이터 전송 중..." }</h2>
            {
                interviewId.map(( sqldata, i ) => {
                    return(
                        <li key={sqldata.wr_id}>
                            <h3>{i+1} {sqldata.wr_a}</h3><div>{sqldata.wr_q}</div>
                        </li>
                    )
                })
            }
            </div>
        );   
}
export default Interview;