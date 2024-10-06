// import React, { useState } from 'react';

// const RemovePatient = () => {
//     const [patientID, setPatientID] = useState('');

//     const handleRemove = (e) => {
//         e.preventDefault();
//         console.log(`Patient ${patientID} removed from the system.`);
//         // Add your removal logic here
//     };

//     return (
//         <div className="remove-patient">
//             <h3>Remove Patient</h3>
//             <form onSubmit={handleRemove}>
//                 <input
//                     type="text"
//                     placeholder="Patient ID"
//                     value={patientID}
//                     onChange={(e) => setPatientID(e.target.value)}
//                 />
//                 <button type="submit">Remove Patient</button>
//             </form>
//         </div>
//     );
// };

// export default RemovePatient;


import React, { useState } from 'react';

const RemovePatient = () => {
    const [patientID, setPatientID] = useState('');

    const handleRemove = (e) => {
        e.preventDefault();
        console.log(`Patient ${patientID} removed from the system.`);
        // Add your removal logic here
    };

    return (
        <div className="remove-patient">
            <h3>Remove Patient</h3>
            <form onSubmit={handleRemove}>
                <label>Patient ID:</label>
                <input
                    type="text"
                    placeholder="Enter Patient ID"
                    value={patientID}
                    onChange={(e) => setPatientID(e.target.value)}
                />
                <button type="submit">Remove Patient</button>
            </form>
        </div>
    );
};

export default RemovePatient;
