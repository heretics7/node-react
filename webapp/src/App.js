import Interview_Comp from "./component/interview";
import Interview_Form from "./component/interviewform";

function App() {
  return (
    <div>
      <h2>RESTful API</h2>
      <Interview_Comp botable='interviewlist' titlenm='사전인터뷰'></Interview_Comp>
      <Interview_Form botable='interviewwrite' titlenm='면접제안'></Interview_Form>
    </div>
  );
}

export default App;
