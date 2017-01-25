var appUrl = 'http://localhost:3000/expensetracker';
var Home = React.createClass({
    render: function(){
        return (
            <main>
                <div className="card-panel">
                    Welcome to your expense tracker! <a href="#/login">Logout</a> 
                </div>
            </main>
        );
    }
});

var MainLayout = React.createClass({
    render: function(){
        var path;
        setInterval(function(){
            path = window.location.hash.split(/\?/g)[0];
            path = path.substring(2,path.length);
            if(path == 'list'){
                var newElem = $('#new');
                newElem.addClass('invisible');
                newElem.removeClass('arrow-up');
                var listElem = $('#list');
                listElem.addClass('arrow-up');
                listElem.removeClass('invisible');
            }
            else if(path == 'new'){
                var newElem = $('#new');
                newElem.addClass('arrow-up');
                newElem.removeClass('invisible');
                var listElem = $('#list');
                listElem.addClass('invisible');
                listElem.removeClass('arrow-up');
            } 
            else {
                var newElem = $('#new');
                newElem.addClass('invisible');
                newElem.removeClass('arrow-up');
                var listElem = $('#list');
                listElem.addClass('invisible');
                listElem.removeClass('arrow-up');
            }
        },300);
        return (
            <div>
                <nav className="z-depth-0">
                    <div className="nav-wrapper red lighten-1">
                       <a href="#/home" className="brand-logo fixed">
                            <img src="assets/favicon.png" height="30" width="30"/>
                            <span>Expense Tracker</span>
                       </a>
                       <ul className="margin-left">
                            <li><a href="#/home/list">View Expenses</a><div className="arrow-up" id="list"></div></li>
                            <li><a href="#/home/new">Add Expense</a><div className="arrow-up" id="new"></div></li>
                       </ul>
                    </div>
                </nav>
                <div id="view" className="view">{this.props.children}</div>
            </div>
        );
    }
});
var { Router,
      Route,
      IndexRoute,
      IndexLink,
      Link } = ReactRouter;

ReactDOM.render(
    <Router>
        <Route path="/home" component={MainLayout}>
            <IndexRoute component={Home}/>
            <Route path="/home/list" component={ExpenseList}/>
            <Route path="/home/new" component={ExpenseForm}/>            
        </Route>    
        <Route path="/login" component={Login}/>
    </Router>, document.getElementById('main')
);
/* Attaching new file */
var DatePicker = React.createClass({
    render: function(){
        var year = [{
            month: 'Jan',
            days: 31
        }, {
            month: 'Feb',
            days: 28
        }, {
            month: 'Mar',
            days: 31
        }, {
            month: 'Apr',
            days: 30
        }, {
            month: 'May',
            days: 31
        }, {
            month: 'Jun',
            days: 30
        }, {
            month: 'Jul',
            days: 31
        }, {
            month: 'Aug',
            days: 31
        }, {
            month: 'Sep',
            days: 30
        }, {
            month: 'Oct',
            days: 31
        }, {
            month: 'Nov',
            days: 30
        }, {
            month: 'Dec',
            days: 31
        }];
        var month = <select id="month">{
            year.map(function(m,i){
                return <option value={i+1}>{m.month}</option>
            })    
        }</select>;
        return (
            <div>
                <div className="row">
                    <div className="col l1">Month</div>
                </div>
                <div className="row">
                    <div className="col l1">{month}</div>
                </div>
            </div>                       
        );
    },
    getInitialState: function(){
        return {
            date: -1,
            month: -1,
            year: -1
        };
    }
});/* Attaching new file */
var ExpenseForm = React.createClass({
    render: function(){
        return (
            <div className="card-panel">
                <div className="row">
                    <form className="col s12 l3">
                        <div class="input-field col">
                            <label for="desc">Description</label>
                            <input id="desc" type="text"/>
                        </div>
                        <div class="input-field col">
                            <label for="value">Value</label>
                            <input id="value" type="text"/>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col s12 l3">
                        <label>Date</label>
                        <input id="date" type="date" className="datepicker"/>
                    </div>
                </div>
                <button className="teal" onClick={this.addExpense}>Save</button>
            </div>
        );
    },
    addExpense: function(){
        var desc = document.getElementById('desc').value;
        var value = document.getElementById('value').value;
        var date = document.getElementById('date').value;
        fetch(appUrl + '/createexpense?desc='+desc+'&value='+value+'&date='+date,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            document.getElementById('desc').value = '';
            document.getElementById('value').value = '';
            document.getElementById('date').value = '';
        });
    }
});/* Attaching new file */
var ExpenseList = React.createClass({
    render: function(){
        var grid,options,gridOptions = {
            editRow: true,
            deleteRow: true
        };
        if(this.state.expenseList.length>0){
            grid = <Grid list={this.state.expenseList} options={gridOptions} onGridEvent={this.handleGridEvent} onLoadFn={this.onLoadFn}/>
        }
        return (
            <aside>
                <div className="card-panel">
                    <div className="row">
                        <DatePicker className="col" />
                    </div>
                    <div className="row">
                        <div className="col s12 m4 l2">                            
                           <p onClick={this.selectRangeOption.bind(this,'range')}>
                              <input id="range" type="radio" name="options" value="range" 
                                     checked={this.state.selectedOption==='range'}/>
                              <label for="range">Date Range</label>
                           </p>
                        </div>
                        <div className="col s12 m4 l2">                            
                           <p onClick={this.selectRangeOption.bind(this,'month')}>
                              <input id="month" type="radio" name="options" value="month" 
                                     checked={this.state.selectedOption==='month'}/>
                              <label for="month">Last 1 Month</label>
                           </p>
                        </div>
                    </div> 
                    <form className="row s12">
                        <div className="col s12 l3">
                            <label>From Date</label>
                            <input id="start-date" type="date" className="datepicker"/>
                        </div>
                        <div className="col s12 l3">
                            <label>To Date</label>
                            <input id="end-date" type="date" className="datepicker"/>
                        </div>
                    </form>
                    <button className="teal" onClick={this.getAllExpenses}>Get Expenses</button><br/><br/>
                </div>
                {
                     grid  
                } 
            </aside>
        );
    },
    getInitialState: function(){
        return {
            expenseList: [],
            selectedOption: 'range'
        };
    },
    getAllExpenses: function(){
        var startDate, endDate, dateFormat = 'YYYY-MM-DD';;
        if(this.state.selectedOption == 'range'){
            startDate = document.getElementById('start-date').value;
            endDate = document.getElementById('end-date').value;
        }
        else {
            startDate = moment().subtract(1,'months').format(dateFormat);
            endDate = moment().format(dateFormat);
        }
        fetch(appUrl + '/getallexpenses?startDate='+startDate+'&endDate='+endDate,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({expenseList: json});  
        });
    },
    handleGridEvent: function(type,entity){
        var list = this.state.expenseList.slice(), expenseId = entity._id;;
        if(type === 'delete') {
            list.forEach(function(exp,index){
                if(exp._id == expenseId){
                    list.splice(index,1);
                }
            });
            fetch(appUrl + '/removeexpense?expenseId='+expenseId,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                return response.json();
            }).then((json) => {
                this.setState({expenseList: list.slice()}); 
            });
        }
        else if(type === 'save'){
            fetch(appUrl + '/updateexpense?_id='+entity._id+'&desc='+entity.desc+'&value='+entity.value+'&date='+entity.date,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                return response.json();
            }).then((json) => {});
        }
    },
    onLoadFn: function(props){
        //on load of grid this will be executed
    },
    selectRangeOption: function(range){
        this.setState({
            selectedOption: range
        });
    }
});/* Attaching new file */
var Grid = React.createClass({
    render: function(){
        var cols = [],rows = [],gridOptions = this.props.options, handleEvents = this.handleGridEvent;
        for(key in this.props.list[0]){
            if(['_id','__v','edited'].indexOf(key)==-1){
                cols.push(key);    
            }
        }        
        if(this.props.list.length>0){
            rows.push(<div className="row header">{
                            cols.map(function(c){
                                return <div className="col s3 m3 center">{c}</div>
                            })}
                            <div className="col s3 m3 center">Actions</div>
                      </div>);
        }
        this.props.list.forEach(function(item){
            rows.push(<Row entity={item} columns={cols} options={gridOptions} onRowEvent={handleEvents}/>);
        });
        return (
            <div className="card-panel z-depth-2 grid">
                {rows}
            </div>
        );
    },
    componentWillMount: function(){
        this.props.onLoadFn(this.props);
    },    
    handleGridEvent: function(type,entity){
        this.props.onGridEvent(type,entity);
    }
});

var Row = React.createClass({
    render: function(){
        var gridOptions = this.props.options, cols = this.props.columns,entity = this.props.entity, actions;
        if(this.props.entity.edited !== true){
            if(gridOptions.editRow && gridOptions.deleteRow){
                actions = <span><i className="fa fa-edit tiny" onClick={this.handleRowEvent.bind(this,'edit',this.props.entity)}></i><i className="fa fa-remove tiny" onClick={this.handleRowEvent.bind(this,'delete',this.props.entity)}></i></span>;
            }
            else if(gridOptions.editRow) {
                actions = <i className="fa fa-edit tiny" onClick={this.handleRowEvent.bind(this,'edit',this.props.entity)}></i>;
            }
            else if(gridOptions.deleteRow) {
                actions = <i className="fa fa-remove tiny" onClick={this.handleRowEvent.bind(this,'delete',this.props.entity)}></i>;
            }
        }
        else {
            actions = <i className="fa fa-save tiny" onClick={this.handleRowEvent.bind(this,'save',this.props.entity)}></i>;
        }
        var valueChanged = this.valueChanged;
        return (            
            <div className="row body">
                {cols.map(function(c){
                    if(entity.edited !== true){
                        return <div className="col s3 m3 center">{entity[c]}</div> 
                    }
                    else {
                        if(c === 'date'){
                            return <div className="col s3 m3 center"><input type="date" className="datepicker" id={'exp-'+c} defaultValue={entity[c]} onChange={valueChanged.bind(this,c)}/></div>     
                        }
                        else {
                            return <div className="col s3 m3 center"><input type="text" id={'exp-'+c} defaultValue={entity[c]} onChange={valueChanged.bind(this,c)}/></div>   
                        }
                    }
                })}
                <div className="col s3 m3 center">{actions}</div>
            </div>
        );
    },  
    handleRowEvent: function(type,entity){
        if(type === 'edit'){
            this.props.entity.edited = true;
            var e = this.props.entity, cols = this.props.columns;
            this.setState(this.state);
        }
        else {
            this.props.entity.edited = false;
            this.setState(this.state);
            this.props.onRowEvent(type,entity);
        }
    },
    valueChanged: function(key,ev){
        this.props.entity[key] = ev.target.value;
    }
});/* Attaching new file */
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