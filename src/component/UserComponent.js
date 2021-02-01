import React, { useEffect, useState } from 'react';
import UserService from '../service/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';


function UserComponent(){

    const [cities, setCities] = useState([]);
    const [incomeTranches, setIncomeTranches] = useState([]);
    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState(null);
    const [incomeTrancheCode, setIncomeTrancheCode] = useState(0);
    const [userIdentityNumber, setUserIdentityNumber] = useState(null);
    const [cityTrafficCode, setCityTrafficCode] = useState(0);
    const [totalScore, setTotalScore] = useState(null);

    useEffect(()=>{
        UserService.getuserCreateModel().then((response) => {
            const { cities, incomeTranches } = response.data;
            setCities(cities);
            setIncomeTranches(incomeTranches);
        });
   
    },[]);
    
    
    const handleSubmit = (evt) => {
        evt.preventDefault();

        const createUserDTO = {
            cityTrafficCode,
            incomeTrancheCode,
            userName,
            userSurname,
            userPhoneNumber,
            userIdentityNumber
        };

        UserService.createUpdateUser({createUserDTO}).then((response) => {
            Promise.all([
                UserService.getCityScore({cityTrafficCode}), 
                UserService.getSegmentScore({userIdentityNumber})
            ]).then((values) => {
                setTotalScore(values.reduce((a,b) => a.data*b.data))
              });
        })
    }

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='userName' value={userName} onChange={e => setUserName(e.target.value)} placeholder='userName'></input>
                <input name='userSurname' value={userSurname} onChange={e => setUserSurname(e.target.value)} placeholder='userSurname'></input>
                <input name='userPhoneNumber' value={userPhoneNumber} onChange={e => setUserPhoneNumber(e.target.value)} placeholder='phoneNumber'></input>
                <input name='userIdentityNumber' value={userIdentityNumber} onChange={e => setUserIdentityNumber(e.target.value)} placeholder='identityNumber'></input>
                
                <select name="city" value={cityTrafficCode} onChange={e => setCityTrafficCode(e.target.value)}>
                    {cities.map((e) => 
                            <option value={e.code}>{e.displayValue}</option>
                    )
                }
                </select>

                <select name="incomeTranche" value={incomeTrancheCode} onChange={e => setIncomeTrancheCode(e.target.value)}>
                    {incomeTranches.map((e) => 
                            <option value={e.code}>{e.displayValue}</option>
                    )
                }
                </select>
                <input type="submit" value="Submit" />
            </form>
            <br></br>
            { totalScore && <div> <h1>Puaniniz: {totalScore}</h1> </div>} 
        </div>
    );
    
}

export default UserComponent