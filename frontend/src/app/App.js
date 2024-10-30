import * as React from 'react';
import BasicTabs from '../overalllayout/OverallLayout';
import ClassroomStatusTestButton from "../classroon_status_UI/ClassroomStatusTestButton";
import MakeChoiceButton from "../MakeTimeChoice/MakeChoiceButton";

function App() {
    return (
        <div className="App">
            <BasicTabs />
            <ClassroomStatusTestButton />
            <MakeChoiceButton />
        </div>
    );
}

export default App;
