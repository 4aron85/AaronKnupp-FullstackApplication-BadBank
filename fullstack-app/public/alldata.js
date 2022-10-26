function AllData(){
  const [data, setData] = React.useState('');

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

  
  React.useEffect(()=>{

    firebase.auth().currentUser.getIdToken()
    .then(idToken => {
      fetch(`/account/all`,
      {
        method: 'GET',
        headers: {
          'Authorization' : idToken
        }
      })
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            setData(JSON.stringify(data));
        });
    });
      
    })
  //     // fetch all accounts from API
  //     fetch('/account/all')
  //       .then(response => response.json())
  //       .then(data =>{
  //           console.log(data);
  //           setData(JSON.stringify(data));
  //       });
  // }, []);

  return (
    <Card
    bgcolor="primary"
    header="All Data in Store"
    body={data}
  />);
}