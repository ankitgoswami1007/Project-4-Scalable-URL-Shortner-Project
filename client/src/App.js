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
        let {data} = await response.json()
        console.log(data.shortUrl)
        setSortUrl(data.shortUrl)
      } catch (error) {
        
      }
  }
  return (
    <>
    <div className="box" >
     
        <div className='a' >
          <input className='b' value={url}  onChange={setValue} type='text' placeholder='Paste link here' />
          <button className='c'  onClick={handleSave}>Generate URL</button>
          {sortUrl && <h6 className='h6'  onClick={()=>{navigator.clipboard.writeText(sortUrl)}}>{sortUrl}</h6>}
        </div>
    </div>
      

    {/* {"the value for url is "+url} */}
    </>
  );
}

export default App;