// Requres props handlePolicyFormData(), policy {}, and submit()


export default function AddPolicy (props){
    console.log("Passed props", props.policy)

    return <>
                <label htmlFor="policy_number"> Policy Number : </label>
                <input onChange={(entry) => props.handlePolicyFormData(entry)} id='policy_number' value={props.policy.policy_number} placeholder="policy number" type='text'></input>
                <br />
                <label htmlFor="type"> Policy Type : </label>
                <input onChange={(entry) => props.handlePolicyFormData(entry)} id='type' value={props.policy.type} placeholder="e.g Motor" type='text'></input>
                <br />
                <label htmlFor="issued_at"> Issued At : </label>
                <input onChange={(entry) => props.handlePolicyFormData(entry)} id='issued_at' value={props.policy.issued_at} placeholder="yyyy-MM-dd'T'HH:mm:ss. SSSXXX" type='date'></input>
                <br />
                <label htmlFor="expires_at"> Expires At : </label>
                <input onChange={(entry) => props.handlePolicyFormData(entry)} id='expires_at' value={props.policy.expires_at} placeholder="yyyy-MM-dd'T'HH:mm:ss. SSSXXX" type='date'></input>
                <br />
                <label htmlFor="owner_id"> Owner's ID Number : </label>
                <input onChange={(entry) => props.handlePolicyFormData(entry)} id='owner_id' value={props.policy.owner_id} placeholder="national id" type='text'></input>
                <br />
                <label htmlFor="item_identifier"> Identifier : </label>
                <input onChange={(entry) => props.handlePolicyFormData(entry)} id='item_identifier' value={props.policy.item_identifier} placeholder="e.g KDG 123H" type='text'></input>
                <br />
            </>          
}