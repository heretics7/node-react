import React from 'react';
import axios from 'axios';
import $ from 'jquery';

export default function interviewform(props){

    const submitClick = async (type, e) => { //하이오더 컴포넌트?
        // 이 안에 비동식 있겠구나, 첫번째 인자 : xml -> sql 선택의 key
        // 두번째 인자는 마우스 피드백
        // 이벤트 리스너 -> 함수(실행문) 저장 -> 객체의 이벤트에 저장됨
        // button.onClick = function(ddd){

        // }
        // button.onClick = function(){ ccc('값') } 동적 개체
        // <button onClick = { e => ccc() }> 정적 개체
        // <button onClick = { e => { return } }> 정적 개체
        // <button onClick = { ccc }>

        // API란? 프로그램들이 서로 상호작용하는 것을 도와주는 매개체
        const fnValidate = (e) =>{
                if(!$('#agreeTerm').is(':checked')){   
                    alert("동의하시게나");
                    $('label[for="agreeTerm"]').addClass('notice');                 
                    return false;
                }
                // if(){
                //     return false
                // }
                    return true; // 제일 아래에 있어야 한다.
                
            }
        if(fnValidate()){ // 동의했기때문에 데이터 모아서 이제 비동기로 노드한테 보내야겟다
        
            // 폼 필드에 원하는 대로 사용자가 데이터를 삽입함
            var  jsonstr = decodeURIComponent($("[name='"+type+"']").serialize());           
            var  json_form = JSON.stringify(jsonstr).replace(/\&/g, '\",\"') 
            json_form = "{\""+ json_form.replace(/=/gi, '\":\"') + "\"}" 
            // json화 -> 노드

            //노드 -> xml -> sql
            try{
                axios(
                    {
                        url :`/reactinterview?type=`+type, // 요청
                        header:{
                            "Content-Type" : "application/json",
                        },
                        method :"POST",
                        body : json_form
                    }
                )
                .then(
                    (result) => { 
                        //select 전용
                        try{ // 데이터도 잘 받음
                            console.log(result);
                            var restext = res.text();
                            if(result.data === 'success'){
                                alert('인터뷰가 등록되었습니다.')
                            }else{
                                alert('인터뷰가 등록되지않았습니다. DB나 노드에서 문제가 있습니다.')
                            }
                        }
                        catch(err){ console.log("result 타입 확인할 것 :"+err.message+"/"+typeof result) } // 데이터 값을 받지 못함 -> DB가 비어있을 수도?
                    }
                )
            }
            catch(err){
                console.log(" 서버통신 문제가 있네 좀있다가 다시 시도해: "+err)
            }
        }
    }
return (
    <div>
        <h2>{ props.titlenm }</h2>
        <form  action=''  method='post' name={props.botable}>
            <div className='formStyle'>
                <dl>                            
                    <dt><label htmlFor='wr_subject'>인터뷰제목</label></dt>
                    <dd>
                        <input type='text' name='wr_subject' id="wr_subject" required />
                    </dd>
                </dl>
                <dl>
                    <dt><label htmlFor="wr_content">인터뷰내용</label></dt>
                    <dd>
                        <textarea rows={5} name="wr_content" id="wr_content"  required >

                        </textarea>
                    </dd>
                </dl>
                <div className="agree">
                    <input type="checkbox" id="agreeTerm" />
                    <label htmlFor="agreeTerm"><span>개인정보정책동의</span></label>
                </div>
                <a href="#none" onClick={e => { submitClick(props.botable, e) }}  className='btn' > 인터뷰올리기 </a>
            </div>
        </form> 
    </div>
    )
}