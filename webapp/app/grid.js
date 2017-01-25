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
});