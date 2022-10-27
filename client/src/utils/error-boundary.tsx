import React from "react";

interface IState {
    error: string;
    hasError:boolean;
}

interface IProps {
    children: JSX.Element;
}

class ErrorBoundary extends React.Component<IProps,IState>{
    
    constructor(props: any) {
        super(props);
        this.state = {hasError: false, error: ""};
    }
    
    static getDerivedStateFromError(error: any) {
        
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error: error.message.toString()};
      }

    componentDidCatch(error: any) {
        
        this.setState({
            error: error
        })
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