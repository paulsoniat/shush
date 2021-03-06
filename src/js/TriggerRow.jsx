import React from 'react';

class TriggerRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      // trigger: Object.assign({}, this.props.trigger),
      cGate: this.props.trigger.gate,
      cMessage: this.props.trigger.message,
      cClip: this.props.trigger.clip
    };
  }
  
  onAddClick() {
    this.props.addTrigger(props.trigger);
  }
  onEditClick() {
    this.setState({editing: true});
    console.log('editing is ', this.state.editing)
  }
  onSaveEditClick() {
    const { cGate , cMessage , cClip } = this.state;
    let newTrigger = Object.assign({}, this.props.trigger);
    newTrigger.gate = cGate;
    newTrigger.message = cMessage;
    newTrigger.clip = cClip;
    this.setState({
      editing: false
    })
    this.props.editTrigger(newTrigger, this.props.index - 1);
  }
  onDeleteClick(trigger, index) {
    this.props.deleteTrigger(trigger, index);
  }

  onGChange(e) {
    this.setState({
      cGate: e.target.value
    });
  }
  onMChange(e) {
    this.setState({
      cMessage: e.target.value
    });
  }
  onCChange(e) {
    this.setState({
      cClip: e.target.value
    });
  }
  
  render() {
    const { index, trigger, addTrigger, editTrigger, deleteTrigger } = this.props;
    const { editing , cGate, cMessage, cClip} = this.state;
    return (
        <tr>
          <td>
            {index}
          </td>
          <td>
            {!editing ? trigger.gate :
              <select className="form-control" onChange={this.onGChange.bind(this)}>
                <option>{cGate}</option>
                <option value=""></option>
                <option>10 dB - breathing</option>
                <option>20 dB - whisper</option>
                <option>50 dB - private conversation</option>
                <option>60 dB - group conversation</option>
                <option>80 dB - busy restaurant</option>
                <option>100 dB - jackhammer</option>
              </select>
            }
          </td>
          <td>
            {!editing ? trigger.message : 
              <input 
              type="text" 
              className="form-control" 
              id="newMessage" 
              value={cMessage}
              onChange={this.onMChange.bind(this)} 
              />
            }
          </td>
          <td>
            {!editing ? trigger.clip :
              <select className="form-control" onChange={this.onCChange.bind(this)}>
                <option>{cClip}</option>
                <option value=""></option>
                <option>"shhhhhhh"</option>
                <option>pin drop</option>
                <option>horn honk</option>
                <option>radio interruption</option>
                <option>Sam says "stop right there"</option>
                <option>Sam says "be like Fonzie"</option>
                <option>Sam says "back off"</option>
                <option>Sam says "get the F out my face"</option>
                <option>Sam says "shut the F up"</option>
              </select>
            }
          </td>
          <td>
            {!editing ? 
              <button className="btn btn-info btn-sm" onClick={this.onEditClick.bind(this)}>edit</button>
              :
              <button className="btn btn-success btn-sm" onClick={this.onSaveEditClick.bind(this)}>save</button>
            }
          </td>
          <td>
            <button className="btn btn-danger btn-sm" onClick={this.onDeleteClick.bind(this, trigger, index - 1)}>remove</button>
          </td>
        </tr>
    )
  }
};

export default TriggerRow;