import React, { useEffect, useState } from 'react';
import '../styles/EmailList.css';
import { Checkbox, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RedoIcon from '@mui/icons-material/Redo';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import SettingsIcon from '@mui/icons-material/Settings';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Section from './Section';
import EmailRow from './EmailRow';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

function EmailList() {
  const [emails, setEmails] = useState([]);
  const colRef = collection(db, 'emails');

  useEffect(() => {
    const q = query(colRef, orderBy('timestamp', 'desc'));
    onSnapshot(q, (snapshot) => setEmails(snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))))
  }, [])
  return (
    <div className='email-list'>
      <div className="email-list-settings">
        {/* 4 icons right next to the compose button */}
        <div className="email-list-settings-left">
          <Checkbox />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        {/* 4 icons right below the menu icon */}
        <div className="email-list-settings-right">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      {/* Primary, Social and Promotions section */}
      <div className="email-list-sections">
        <Section Icon={InboxIcon} 
                 title='Primary' 
                 color='red' 
                 selected
        />
        <Section Icon={PeopleIcon} 
                 title='Social' 
                 color='#1A73E8' 
        />
        <Section Icon={LocalOfferIcon} 
                 title='Promotions' 
                 color='green' 
        />
      </div>
      <div className="email-list-list">
        {emails.map(({id, data: { to, subject, message, timestamp }}) => (
          <EmailRow 
            id={id}
            key={id}
            title={to}
            subject={subject}
            description={message}
            time={new Date(timestamp?.seconds * 1000).toDateString()}
          />
        ))}
      </div>
    </div>
  )
}

export default EmailList