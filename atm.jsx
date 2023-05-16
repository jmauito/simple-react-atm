const ATMDeposit = ({ onChange, isDeposit, showSubmit }) => {
    const choice = ["Deposit", "Cash back"];
    const displayStatus = ["inline", "none"];

    return (<label className="label huge">
        <label >{choice[Number(!isDeposit)]}</label>
        <input type="number" onChange={onChange} />
        <input type="submit" value={choice[Number(!isDeposit)]} style={{display: displayStatus[Number(!showSubmit)] }} />
    </label>);
}

const Account = () => {
    let transactionState = 0;
    let error = '';
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [showSubmit, setShowSubmit] = React.useState( false);

    const handleChange = element => {
        transactionState = (Number(element.target.value));
    }

    const markDeposit = (isDeposit) => {
        setIsDeposit(isDeposit);
        setShowSubmit(true);
    }
    const handleSubmit = () => {
        event.preventDefault();
        if(transactionState < 0){
            alert('Value should be greater 0');
            return;
        }

        if(!isDeposit && transactionState>totalState){
            alert('Withdraw should be smallest or equals than account balance');
            return;
        }

        const newTotal = isDeposit ? transactionState + totalState : totalState - transactionState;
        setTotalState(newTotal);
        transactionState = 0;

    }
    
    return (
        <>
        <h2>Account balance: {totalState}</h2>
        <form onSubmit={handleSubmit}>
            <button onClick={()=>markDeposit(true)}> Deposit</button>
            <button onClick={()=>markDeposit(false)}> Cash back</button>
            <ATMDeposit showSubmit = {showSubmit} onChange={handleChange} isDeposit={isDeposit}></ATMDeposit>
            <p>{error}</p>
        </form>
        </>
    );
}

ReactDOM.render(<Account></Account>, document.getElementById("root"));