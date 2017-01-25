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
});