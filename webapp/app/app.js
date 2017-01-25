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
