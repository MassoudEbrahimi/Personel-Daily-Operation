import React, { Component } from 'react';
import Headers from './Header';
import MasterContent from './MasterContent';


class Dashboard extends Component {
    state = {}
    render() {
        return (
            <div>
                <Headers />
                <MasterContent />
            </div>
        );
    }
}

export default Dashboard;