import React from 'react';
// import { Input, Button, Row, Col } from 'reactstrap';
import './App.css' 
import './index.css'


function App() {
  const [url,setUrl] = React.useState("")
  const [sortUrl, setSortUrl] = React.useState('');
  const setValue =  (event)=>{
    console.log("event called")
    setUrl(event.target.value)
  }
  const handleSave = async() => {
      console.log(url)
      if(url.length=== 0) return;
      try {
        const response = await fetch("apiV1/url/shorten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({longUrl: url}),
        })
        console.log("hi")
        let {status,data} = await response.json()
        console.log(data.shortUrl)
        setSortUrl(data.shortUrl)
      } catch (error) {
        
      }
  }
  return (
    <>
    <div className="container" style={{ backgroundColor: "#778899", display: 'flex',flexDirection:'row', justifyContent:"center", alignItems:"center", height:"100vh", width: "100vw"   }}>
     
        <div className='a' style={{padding:10, backgroundColor:"white" , borderRadius:8  }}>
          <input value={url} style={{paddingLeft:10, width:550,paddingTop:5, paddingBottom:5,borderRadius:6, borderColor:"#34495E"}} onChange={setValue} type='text' placeholder='Enter URL' />
          <button className='' style={{marginLeft:20, paddingTop:5, paddingBottom:5 ,borderRadius:6 }} onClick={handleSave}>Submit</button>
          {sortUrl && <h6 style={{marginTop:20 , textAlign:'center'}} onClick={()=>{navigator.clipboard.writeText(sortUrl)}}>{sortUrl}</h6>}
        </div>
    </div>
      

    {/* {"the value for url is "+url} */}
    </>
  );
}

export default App;