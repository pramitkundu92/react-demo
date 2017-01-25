var Login = React.createClass({
    render: function(){
        var alert = <div></div>;
        if(this.state.status){
            alert =  <div className="alert red lighten-1">Invalid Username / Password</div>; 
        }
        return (
            <main>
                <nav className="z-depth-0">
                    <div className="nav-wrapper red lighten-1">
                       <a href="#/login" className="brand-logo fixed">
                            <img src="assets/favicon.png" height="30" width="30"/>
                            <span>Expense Tracker</span>
                       </a>
                    </div>
                </nav>
                <div className="section"></div>
                <div className="section"></div>
                <div className="section"><center>{alert}</center></div>
                <div className="row">
                    <div className="col l4"></div>
                    <div className="col l4 card-panel login-card">
                        <center>
                            <div className="input-field"> 
                                <input type="text" name="username" id="username" />                           
                                <label for="username">Enter your username</label>
                            </div>
                            <div className="input-field">
                                <input type="password" name="password" id="password" />
                                <label for="password">Enter your password</label>
                            </div>
                            <a onClick={this.login}>Login / Sign In</a>    
                        </center>
                    </div>
                    <div className="col l4"></div>
                </div>
                <div className="section"></div>
            </main>
        );
    },
    getInitialState: function(){
        return({
            status: false    
        });
    },
    login: function(){
        var uname = document.getElementById('username').value, pass = document.getElementById('password').value;
        fetch(appUrl + '/getuser?username='+uname+'&password='+pass,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            if(json.status != 2){
                this.setState({status: true});    
            }
            else {
                window.sessionStorage.username = uname;
                this.setState({status: false});  
                window.location.href = '/expensetracker/index#/home' ;
            } 
        });
    } 
});