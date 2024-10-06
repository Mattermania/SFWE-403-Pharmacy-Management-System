// import React, { useState } from 'react';

// const PharmacyInfo = () => {
//     const [pharmacyInfo, setPharmacyInfo] = useState({
//         name: '',
//         website: '',
//         address: '',
//         owner: '',
//         phone: '',
//         hours: '',
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setPharmacyInfo({ ...pharmacyInfo, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Pharmacy Info:", pharmacyInfo);
//         // Logic to save the pharmacy info goes here
//     };

//     return (
//         <div className="pharmacy-info">
//             <h3>Store Pharmacy Information</h3>
//             <form onSubmit={handleSubmit}>
//                 <input name="name" placeholder="Pharmacy Name" onChange={handleInputChange} />
//                 <input name="website" placeholder="Website" onChange={handleInputChange} />
//                 <input name="address" placeholder="Address" onChange={handleInputChange} />
//                 <input name="owner" placeholder="Owner" onChange={handleInputChange} />
//                 <input name="phone" placeholder="Phone Number" onChange={handleInputChange} />
//                 <input name="hours" placeholder="Working Hours" onChange={handleInputChange} />
//                 <button type="submit">Save Info</button>
//             </form>
//         </div>
//     );
// };

// export default PharmacyInfo;


import React, { useState } from 'react';

const PharmacyInfo = () => {
    const [pharmacyInfo, setPharmacyInfo] = useState({
        name: '',
        website: '',
        address: '',
        owner: '',
        phone: '',
        hours: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPharmacyInfo({ ...pharmacyInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Pharmacy Info:", pharmacyInfo);
        // Logic to save the pharmacy info goes here
    };

    return (
        <div className="pharmacy-info">
            <h3>Store Pharmacy Information</h3>
            <form onSubmit={handleSubmit}>
                <label>Pharmacy Name:</label>
                <input name="name" placeholder="Pharmacy Name" onChange={handleInputChange} />
                <label>Website:</label>
                <input name="website" placeholder="Website" onChange={handleInputChange} />
                <label>Address:</label>
                <input name="address" placeholder="Address" onChange={handleInputChange} />
                <label>Owner:</label>
                <input name="owner" placeholder="Owner" onChange={handleInputChange} />
                <label>Phone Number:</label>
                <input name="phone" placeholder="Phone Number" onChange={handleInputChange} />
                <label>Working Hours:</label>
                <input name="hours" placeholder="Working Hours" onChange={handleInputChange} />
                <button type="submit">Save Info</button>
            </form>
        </div>
    );
};

export default PharmacyInfo;
