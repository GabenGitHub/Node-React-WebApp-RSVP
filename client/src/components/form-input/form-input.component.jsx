import React from 'react';

const FormInput = ( {state, checkName, handleSubmit, handleChange} ) => {
    return(
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Your name: </label>
                    <input 
                        type="text" 
                        name='name' 
                        placeholder='type your name'
                        onChange={checkName} 
                        value={state.name}
                        required
                    />
                </div>
                <div>
                    <label>Are you participate? </label>
                    <select 
                        name='participate' 
                        onChange={handleChange} 
                        value={state.participate}
                        required
                    >
                        <option disabled hidden value=''> -- select an option -- </option>
                        <option value='yes'>Coming</option>
                        <option value='no'>Not coming</option>
                    </select>
                </div>
                <div>
                    <input 
                    type='checkbox'
                    name='plusOne'
                    onChange={handleChange}
                    checked={state.plusOne}
                    />
                    <label> +1 guest</label>
                </div>
                <div>
                    <input
                        type='text'
                        name='plusOneName'
                        placeholder='name of +1'
                        onChange={handleChange}
                        value={state.plusOneName}
                        required
                    />
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
};

export default FormInput;