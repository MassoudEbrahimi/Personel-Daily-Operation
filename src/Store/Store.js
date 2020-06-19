import React, {Component, createContext} from 'react';
let Store = createContext();


class BaseStore extends Component {

    constructor (props) {
        super(props);
        this.state = {
            ...props.store,
            modal : {},
            grid : {}
        }
    }

    loadGrid = (id, model) => {
        this.state.grid[id] = model;
        this.setStore('grid', this.state.grid);
    }

    loadModal = (id, model) => {
        this.state.modal[id] = model;
        this.setStore('modal', this.state.modal);
    }

    setStore = (key, value, cb) => {
        this.setState(()=>{
            return {[key] : value}
        }, () =>{
            cb && cb()
        })
    }

    getStore = () =>{ 
        return this.state;
    }

    createActions = () => {
        let actions = {}
        
        for (let ac in this) {
            if(typeof this[ac] === 'function') {
                actions[ac] = this[ac]
            }
        }
        return actions

    }

    createValue = () =>{
        return {
            setStore : this.setStore,
            getStore : this.getStore,
            actions : this.createActions ()
        }
    }

    render () {
        return (
            <Store.Provider value={this.createValue()}>
                {this.props.children}
            </Store.Provider>
        )
    }
}
BaseStore.defaultProps = {
    actions : {},
    stroe : {}
}

export const StoreProvider = BaseStore;
export const mapStore =  (cls) =>{
    cls.contextType = Store;
};

