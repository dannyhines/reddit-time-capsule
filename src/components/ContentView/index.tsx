import React from "react";
import { Layout, BackTop } from 'antd'
import CardView from '../CardView';
import DateSelectionView from '../DateSelector';
import './ContentView.css'

interface ContentViewProps {
}

const ContentView: React.FC<ContentViewProps> = (props) => {

    function dateChanged(value: number) {
        console.log("dateChanged, ", value);
    }

    return (
        <Layout className="content-view">
            <BackTop />

            <DateSelectionView dateChanged={dateChanged} />


        </Layout>
    );
};

export default ContentView;
