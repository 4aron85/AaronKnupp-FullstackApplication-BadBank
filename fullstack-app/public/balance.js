function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="primary"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  // const [balance, setBalance] = React.useState('');  

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
    fetch(`/account/findOne/${email}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(`Balance: $ ${data.balance}`);
            props.setShow(false);
            //setBalance(user.balance);
            console.log('JSON:', data);
        } catch(err) {
            const data = JSON.parse(text);
            console.log(data);
            console.log(`data.balance: ${data.balance}`);
            props.setStatus(`Error`)
            console.log('err:', text);
        }
    });
  }
  // const ctx = React.useContext(UserContext);  

  // function handle(){
  //   const user = ctx.users.find((user) => user.email == email);
  //   if (!user) {
  //     props.setStatus('fail!')      
  //     return;      
  //   }

  //   setBalance(user.balance);
  //   console.log(user);
  //   props.setStatus('Your balance is: ' + user.balance);      
  //   props.setShow(false);
  // }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}