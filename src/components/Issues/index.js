import React, {useState, useEffect} from "react"
import { connect } from 'react-redux'
import {fetchIssues} from "../../api"
import { bindActionCreators } from 'redux';



const s2p = state => state;
const d2p = dispatch => bindActionCreators({
  fetchIssues: fetchIssues
}, dispatch)

const Issues = ({pending, issues, fetchIssues}) => {

  useEffect(()=>{
    fetchIssues()
  },[])

  return <div className="issues-wrap">
    {pending}
    {issues.map( issue => (
        <div key={issue.region}>{issue.region}</div>
    ))}
  </div>
}

export default connect(
    s2p,
    d2p
)(Issues)