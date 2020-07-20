import React from 'react';
import { Grid, Message, Label, Icon, Loader, Menu, Input } from 'semantic-ui-react';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
       super(props);
        this.state = { 
            responseMessage : "", 
            progressing: false, 
            isEmployee: false,
            dept_no : "",
            dept_name : "",
            old_no: "",
            old_name: "",
            id: "",
            name : "",
            description : "",
            price: "",
            qty: "",

       };
   }

  async getData (url){
    const response = await axios.get(url);
    console.log("async getData(url)");
    console.log("url = " + url);
    console.log(response.data);
    this.setState ({
        responseMessage: response.data,
        progressing: false
    });
  }

  readClicked() {
      const backend = "/product";  
      console.log("on deptClicked");
      this.setState ({
          progressing: true,
          responseMessage: "",
          isDepartment: true
       });
      this.getData(backend);
   }

   createClicked() {
      const backend = "/product";

      console.log("on addDeptClicked");
      const {name, description, price, qty} = this.state;
      if ( name === undefined || name === "" || description === undefined || description  === "" ||
           price === undefined || price === "" || qty === undefined || qty  === "" ) {
           console.log ("please complete all fields");
           return;
      }
      console.log("name = ", name);
      console.log("description = ", description);
      console.log("price = ", price);
      console.log("qty = ", qty);

      this.setState ({
          progressing: true,
          responseMessage: "",
          isDepartment: false
      });
      this.postData(backend, {name: name, description: description, price: price, qty: qty});
    }

    async postData (url, data){
      try {
            const response = await axios.post(url, data);

            console.log("postData()");
            console.log("url = " + url);
            console.log(response.status);
            
            this.setState ({
                progressing: false,
                name: "",
                description : "",
                price : "",
                qty : ""
            });
    } catch (error) {
            console.log(`Axios post failed: ${error}`);
            this.setState ({
                 progressing: false,
                 name: "",
                 description : "",
                 price : "",
                 qty : ""
            });
       }
    }

    deleteClicked() {
      const {id} = this.state;
      if (id === undefined || id === "" )
          return;
      console.log("on deleteClicked");
      console.log(id);
      this.setState ({
          progressing: true,
          responseMessage: "",
          isDepartment: false
      });
      const backend = "/product/" + id;
      this.deleteData(backend, {id: id});
    }

    updateClicked() {
      const {id, name, description, price, qty} = this.state;
      console.log("on updatClicked");
      console.log(id);
      console.log(name);
      console.log(description);
      console.log (price)
      console.log(qty);
      
      if  (id   === undefined || id === "" ||
           name  === undefined || name === "" ||
           description === undefined || description === ""  ||
           price   === undefined || price === "" ||
           qty === undefined || qty === ""  )  {
           console.log ("please fill all the fields");
           return;
      }
      
      this.setState ({
          progressing: true,
          responseMessage: "",
          isDepartment: false
      });
      const backend = "/product/" + id;
      console.log(backend)
      this.putData(backend, {id: id, name: name, description: description, price: price, qty: qty});
    }

    async putData (url, data){
      try {
            const response = await axios.put(url, data);
            console.log("putData()");
            console.log("url = " + url);
            console.log(response.status);
            console.log (response.data)
            this.setState ({
                progressing: false
            });
    } catch (error) {
            console.log(`Axios post failed: ${error}`);
            this.setState ({
                 progressing: false
            });
       }
    }

    async deleteData (url, data){
      try {
            const response = await axios.delete(url, data);
            console.log("deleteData()");
            console.log("url = " + url);
            console.log(response.status);
            console.log(response.data);
            this.setState ({
                progressing: false
            });
    } catch (error) {
            console.log(`Axios delete failed: ${error}`);
            this.setState ({
                 progressing: false
            });
       }
    }   

   
  displayRows = rows =>
      rows.length > 0 &&
      rows.map(row => {
          const {isDepartment} = this.state;

          if (isDepartment) {
              const {id, name, description, price, qty} = row;
              const item = "id : " + id  + " ,  name : " + name + " ,  description : " + description + " , price : " + price + " , qty : " + qty; 
              return ( <Menu.Item key={id+name} >
                           {item}
                       </Menu.Item>)
            }
      });

  
   render() {  
      const { responseMessage, progressing } = this.state;

      return (
        <Grid style={styles.container}>
            
            <Grid.Row style={styles.menucontainer}>
                <Message style={styles.userheader}>
                     <p> CRUD operation of a full stack application: Flask backend, React frontend, SQLITE database </p>
                </Message> 
            </Grid.Row> 
            <Grid.Row style={styles.menucontainer}>  
                 
                <Grid.Column style={styles.testColumn}>  
                     <Label style={styles.menulabel}> Create  </Label>
                     <Input type="text" placeholder="product name" style={{width:"100%", marginTop: "15px"}} 
                           onChange={(e, { value }) => this.setState ({name: value})} />
                     <Input type="text" placeholder="product description" style={{width:"100%", marginTop: "5px"}} 
                           onChange={(e, { value }) => this.setState({description: value})} />
                     <Input type="text" placeholder="product price" style={{width:"100%", marginTop: "15px"}} 
                           onChange={(e, { value }) => this.setState ({price: value})} />
                     <Input type="text" placeholder="product quantity" style={{width:"100%", marginTop: "5px"}} 
                           onChange={(e, { value }) => this.setState({qty: value})} />

                     <Icon name="play circle outline" color="green" size="huge" 
                           disabled={progressing} style={{position: "relative", left: "38%", marginTop: "10px"}} 
                           onClick={()=>this.createClicked()}> </Icon>                  
                </Grid.Column>

                <Grid.Column style={styles.testColumn}>  
                    <Label style={styles.menulabel}> Read </Label>
                     <Icon name="play circle outline" color="green" size="huge" disabled={progressing} style={{position: "relative", left: "38%", marginTop: "10px"}} onClick={()=>this.readClicked()}> </Icon>                  
                   </Grid.Column>


                <Grid.Column style={styles.testColumn}>  
                     <Label style={styles.menulabel}> Update </Label>

                     <Input type="text" placeholder="product id" style={{width:"100%", marginTop: "15px"}} 
                           onChange={(e, { value }) => this.setState ({id: value})} />
                     <Input type="text" placeholder="product name" style={{width:"100%", marginTop: "5px"}} 
                           onChange={(e, { value }) => this.setState({name: value})} />
                     <Input type="text" placeholder="product description" style={{width:"100%", marginTop: "15px"}} 
                           onChange={(e, { value }) => this.setState ({description: value})} />
                     <Input type="text" placeholder="product price" style={{width:"100%", marginTop: "5px"}} 
                           onChange={(e, { value }) => this.setState({price: value})} />
                     <Input type="text" placeholder="product quantity" style={{width:"100%", marginTop: "5px"}} 
                           onChange={(e, { value }) => this.setState({qty: value})} />

                     <Icon name="play circle outline" color="green" size="huge" 
                           disabled={progressing} style={{position: "relative", left: "38%", marginTop: "10px"}} 
                           onClick={()=>this.updateClicked()}> </Icon>                  
                </Grid.Column>

                <Grid.Column style={styles.testColumn}>  
                     <Label style={styles.menulabel}> Delete  </Label>
                     <Input type="text" placeholder="product id" style={{width:"100%", marginTop: "15px"}} 
                           onChange={(e, { value }) => this.setState ({id: value})} />
                     <Icon name="play circle outline" color="green" size="huge" 
                           disabled={progressing} style={{position: "relative", left: "38%", marginTop: "10px"}} 
                           onClick={()=>this.deleteClicked()}> </Icon>                  
                </Grid.Column>


            </Grid.Row> 
            <Grid.Row style={{width: "100%", marginTop: "10px"}}>
                 <Grid.Column style={{width: "10%", marginLeft: "10px"}}>               
                      <Loader active={progressing} size="large"/> 
                 </Grid.Column>   
                 <Grid.Column style={{width: "90%", marginLeft: "10px"}}>               
                      {responseMessage && <Menu vertical style={styles.responsePrompt}> {this.displayRows(responseMessage)} </Menu>} 
                 </Grid.Column>              
            </Grid.Row> 
        </Grid>
      );
   }
}
export default App;

const styles = {
   container: {
      padding: "2px",
      margin:  "2px",
      width:   "100%",
   },
   userheader: {
    padding:    "20px",
    margin:     "20px",
    width:      "100%",
    fontWeight: "bold",
    fontSize:   "large",
    textAlign: "center"
   },
   responsePrompt: {
    padding:    "5px",
    margin:     "5px",
    width:      "100%",
    fontWeight: "normal",
    fontSize:   "medium", 
    backgroundColor: "white",
    color: "green", 
    overflow: "scroll"
   },
   menuContainer: {
    padding:    "4px",
    margin:     "4px",
    width:      "100%",
    border:     "1px solid black"
   },
   menulabel: {
    padding: "3px",
    margin:  "4px",
    width:   "95%",
    fontWeight: "bold",
    fontSize:   "large",
    backgroundColor: "white",
    textAlign: "center"
   },
   testColumn: {
    padding:    "8px",
    marginLeft:     "10px",
    marginRight:  "10px",
    marginTop: "20px", 
    width:      "21%",
    border:     "1px dotted black"
   },
 };