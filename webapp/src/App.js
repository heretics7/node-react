import Header from "./component/Header";
import Interview_Comp from "./component/interview";
import Interview_Form from "./component/interviewform";
import About from "./component/About";
import "./css/App.scss"

function App() {
  return (
    <div>
      {/* {header} 헤더 푸터는 처음 로딩할 땐 무겁겠지만 안정적인 클래스형 컴포넌트로 제작 */}
      <Header></Header>
      {/* {swiper} */}
      <About></About>
      {/* {portfolio} */}
      <Interview_Comp botable='interviewlist' titlenm='사전인터뷰'></Interview_Comp>
      <Interview_Form botable='interviewwrite' titlenm='면접제안'></Interview_Form>
      {/* {footer} */}
    </div>
  );
}

export default App;
