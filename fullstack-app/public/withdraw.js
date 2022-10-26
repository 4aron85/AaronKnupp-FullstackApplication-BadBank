function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="primary"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  // const ctx = React.useContext(UserContext);  

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
    console.log(email,amount);

    firebase.auth().currentUser.getIdToken()
    .then(idToken => {
      fetch(`/account/update/${email}/-${amount}`, {
        method: 'GET',
        headers: {
          'Authorization' : idToken
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        props.setStatus('');
        props.setShow(false);
      });
    })
  }
  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}