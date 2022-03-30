import React, {useEffect, useState} from 'react'; 
import axios from 'axios';

const Interview = (props) => {   

    let [ interviewId, interviewIdUpdate ] = useState([]);
    const [typeData,insertDB] = useState(0);   

    const interviewDataSetting = async () => {

        await axios.get(`/reactinterview?botable=${props.botable}`)
                .then(
                    (result) => {  
                        try{
                            console.log(result);
                            interviewIdUpdate([...result.data]);
                            insertDB(result.data[result.data.length - 1].wr_id);
                        }
                        catch(err){ console.log(err.message) }
                    }
                )
                .catch( e => { console.log(e +'에러로 통신 제한') }
                ) 
    } 
    useEffect( () => {  interviewDataSetting(); } , [typeData]  )          
        return (  
            <div><h2>{ interviewId.length > 0 ? "사전인터뷰" : "데이터 전송 중" }</h2>
            {
                interviewId.map(( contant, i ) => {
                    return(
                        <li>
                            <h3>{i+1} {contant.wr_a}</h3><div>{contant.wr_q}</div>
                        </li>
                    )
                })
            }
            </div>
        );   
}
export default Interview;