import React from 'react';
import './treatment.css';
import ruleImg from '../../images/rules.jpg';
import { Link } from 'react-router-dom';
const Treatment = () => {
  const selfCare = [
    {
      id: 1,
      msg: 'Isolate yourself in a well ventilated room.',
    },
    {
      id: 2,
      msg: 'Use a triple layer medical mask, discard mask after 8 hours of use or earlier if they become wet or visibly soiled. In the event of a caregiver entering the room, both caregiver and patient may consider using N 95 mask.',
    },
    {
      id: 3,
      msg: 'Mask should be discarded only after disinfecting it with 1% Sodium Hypochlorite.',
    },
    {
      id: 4,
      msg: 'Take rest and drink a lot of fluids to maintain adequate hydration.',
    },
    {
      id: 5,
      msg: 'Follow respiratory etiquettes at all times.',
    },
    {
      id: 6,
      msg: 'Frequent hand washing with soap and water for at least 40 seconds or clean with alcohol-based sanitizer.',
    },
    {
      id: 7,
      msg: 'Don’t share personal items with other people in the household.',
    },
    {
      id: 8,
      msg: 'Ensure cleaning of surfaces in the room that are touched often (tabletops, doorknobs, handles, etc.) with 1% hypochlorite solution.',
    },
    {
      id: 9,
      msg: 'Monitor temperature daily.',
    },
    {
      id: 10,
      msg: 'Monitor oxygen saturation with a pulse oximeter daily.',
    },
    {
      id: 11,
      msg: 'Connect with the treating physician promptly if any deterioration of symptoms is noticed.',
    },
  ];

  const instructions = [
    {
      id: 1,
      message:
        'Mask: The caregiver should wear a triple layer medical mask. N95 mask may be considered when in the same room with the ill person.',
    },
    {
      id: 2,
      message: `Hand hygiene: Hand hygiene must be ensured following contact with ill person or patient's immediate environment.`,
    },

    {
      id: 3,
      message:
        'Exposure to patient/patient’s environment: Avoid direct contact with body fluids of the patient, particularly oral or respiratory secretions. Use disposable gloves while handling the patient. Perform hand hygiene before and after removing gloves.',
    },
  ];
  return (
    <div className="box">
      <h2 className="main-heading text-success">Treatments</h2>
      <hr />
      <p className="second-heading text-muted">SELF-CARE</p>
      <div className="row">
        <div className="col-lg-5">
          <p className="treatment-heading">
            Asymptomatic cases, mild cases of COVID-19:
          </p>
          <ul>
            {selfCare.map((element) => {
              return (
                <li className="msg-item" key={element.id}>
                  {element.msg}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-lg-7" style={{ alignSelf: 'center' }}>
          <img
            className="rule-img"
            src={ruleImg}
            alt="Set of rules need to follow"
          />
        </div>
      </div>
      <p className="treatment-heading">Instructions for caregivers:</p>
      <ul>
        {instructions.map((element) => {
          return (
            <li className="msg-item" key={element.id}>
              {element.message}
            </li>
          );
        })}
      </ul>
      <p className="treatment-heading">
        <Link
          className="text-success"
          style={{ textDecoration: 'none' }}
          to="/"
        >
          Click here{' '}
        </Link>
        to book an appointment
      </p>
    </div>
  );
};

export default Treatment;
