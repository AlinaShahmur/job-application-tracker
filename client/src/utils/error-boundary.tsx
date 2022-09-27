import React from "react";

interface IState {
    error: string;
    hasError:boolean;
}

class ErrorBoundary extends React.Component<{},IState>{
    
    constructor(props: any) {
        super(props);
        this.state = {hasError: false, error: ""};
    }
    
    static getDerivedStateFromError(error: any) {
        console.log("getDerivedStateFromError");
        
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error: error.message.toString()};
      }

    componentDidCatch(error: any) {
        console.log("componentDidCatch");
        
        // this.setState({
        //     error: error
        // })
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Something went wrong</h2>
                    <p>{this.state.error}</p>
                </div>

            )
        }
        return this.props.children
    }
}

export default ErrorBoundary