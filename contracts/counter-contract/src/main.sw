contract;
//declare the type of the file (contract, script, etc)

use std::{chain::auth::{AuthError, msg_sender}, hash::sha256, logging::log, storage::{get, store, StorageMap}};
// using std library above

//const OWNER = ~Address::from(0x9299da6c73e6dc03eeabcce242bb347de3f5f56cd1c70926d76526d7ed199b8b);
// const owner is set, not sure why but this will be replaced with the msg sender


storage {
    addressToNames: StorageMap<Address, str[5]> = StorageMap {},
    namesToAddress: StorageMap<str[5], Address> = StorageMap {},
    //create a domains mapping the address and the string
}

abi Storage {

    #[storage(read, write)]
    fn register(address_owner: Address, name: str[5]); 
    //using the fn register to take in the owåners address and a preset name string of 
    //length 5 until can figure out alternative

    #[storage(read)]
    fn get_name(name: str[5]) -> Address;
}

// const ADDRESS_KEY: b256 = 0x0000000000000000000000000000000000000000000000000000000000000000;

impl Storage for Contract {
    #[storage(read)]
    fn get_name(name: str[5]) -> Address {
        storage.namesToAddress.get(name)
    }
    
    #[storage(read, write)]
        fn register(address_owner: Address, name: str[5]) {

        storage.addressToNames.insert(address_owner, name);
        storage.namesToAddress.insert(name, address_owner);
    }   
}