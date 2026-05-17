import { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="flex justify-center py-10">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
}

export default Loading;
