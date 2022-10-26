function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow}/> : 
        <CreateMsg setShow={setShow}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');


const firebaseConfig = {
  apiKey: "AIzaSyBMJghRBVJIie4MNlpbNbAkehf7jKtTE2Y",
  authDomain: "badbankauth-4c4fd.firebaseapp.com",
  projectId: "badbankauth-4c4fd",
  storageBucket: "badbankauth-4c4fd.appspot.com",
  messagingSenderId: "133968300709",
  appId: "1:133968300709:web:b65524c84c1e1380781b4c",
  measurementId: "G-YZ2PEP2KZD"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


  function handle(){
    fetch(`/account/create/${name}/${email}/${password}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(email, password);

      promise.catch(({message}) => console.log(message))
    });

    props.setShow(false);
  }    

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}