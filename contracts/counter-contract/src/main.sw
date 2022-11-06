contract;
//declare the type of the file (contract, script, etc)

use std::{chain::auth::{AuthError, msg_sender}, hash::sha256, logging::log, storage::{get, store, StorageMap}};
// using std library above

//const OWNER = ~Address::from(0x9299da6c73e6dc03eeabcce242bb347de3f5f56cd1c70926d76526d7ed199b8b);
// const owner is set, not sure why but this will be replaced with the msg sender


storage {
    counter: u64 = 0,
    addressToNames: StorageMap<Address, str[5]> = StorageMap {},
    namesToAddress: StorageMap<str[5], Address> = StorageMap {},
    //create a domains mapping the address and the string
}

abi Storage {

    #[storage(read, write)]
    fn register(address_owner: Address, name: str[5]); 
    //using the fn register to take in the owners address and a preset name string of 
    //length 5 until can figure out alternative

    #[storage(read)]
    fn get_name() -> Address;
}

const ADDRESS_KEY: b256 = 0x0000000000000000000000000000000000000000000000000000000000000000;

impl Storage for Contract {
    #[storage(read)]
    fn get_name() -> Address {
        // if get_name() == false {
        //     false;
        // } else {
        //     true;
        // } 
        //working on the above currently to check if name exists in namesToAddress StorageMap
        //if so, return true
        //later add this check to register function so if true it continues on to register
        let domainName = get::<Address>(ADDRESS_KEY);
        domainName
    }
    
    #[storage(read, write)]
        fn register(address_owner: Address, name: str[5]) {
        // Note: The return type of `msg_sender()` can be inferred by the
        // compiler. It is shown here for explicitness.
        let sender: Result<Identity, AuthError> = msg_sender();
        let sender: Address = match sender.unwrap() {
            Identity::Address(addr) => {
                addr
            },
            _ => revert(0),
        };
        storage.addressToNames.insert(address_owner, name);
        storage.namesToAddress.insert(name, address_owner);
    }   
}

