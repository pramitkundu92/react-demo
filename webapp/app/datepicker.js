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
});