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

    const submitClick = async (type, e) => {

        const fnValidate = (e) => {
            //여기서 유효성 검사, 필드에 값이 맞지 않거나 등등
            return true;
        }
        if(fnValidate()){

            var jsonstr = decodeURIComponent($("[name='interviewwrite']").serialize()); // decodeURIComponent -> 유니코드를 한글로 변환 / 네임*값&네임*값
            // 어떤 폼에도 받아낼 수 있도록 제이쿼리 시리얼라이즈를 사용함
            alert("1."+jsonstr);

            var json_form = JSON.stringify(jsonstr).replace(/\&/g, '\",\"');  // 네임*값","네임*값

            alert("2."+json_form);

            json_form = "{\"" + json_form.replace(/=/gi, '\":\"') + "\"}" // {"네임":"값","네임":"값"}

            alert("3.데이터를 한번에  json문법화됨 serialize() 안쓰면 일일이 담아야 함"+json_form);
            console.log(json_form);

            e.preventDefault(); //react에서는 폼태그 전송 막기 위해서는 return false 가 아니다.
        }
    }

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
                <form  action='' onSubmit={ e => { submitClick("interviewwrite", e); }}  method='post' name="interviewwrite">
                    <div className='formStyle'>
                        <dl>
                            <dt>인터뷰제목</dt>
                            <dd>
                                <input type='text' name='wr_subject' />
                            </dd>
                        </dl>
                        <dl>
                            <dt>인터뷰내용</dt>
                            <dd>
                                <textarea rows={5} name="wr_content">

                                </textarea>
                            </dd>
                        </dl>
                        <button className='btn'> 인터뷰올리기 </button>

                    </div>
                </form>
            </div>
        );   
}
export default Interview;