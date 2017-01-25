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
});