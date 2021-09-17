import './app.css';
import {Container} from "@material-ui/core";
import TasksList from "../tasks-list/tasks-list";
import Header from "../header/header";

function App() {
    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <TasksList/>
            </Container>
        </>
    );
}

export default App;
