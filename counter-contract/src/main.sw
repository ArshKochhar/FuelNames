contract;
//declare the type of the file (contract, script, etc)

use std::{chain::auth::{AuthError, msg_sender}, hash::sha256, logging::log, storage::StorageMap, auth::msg_sender()};
// using std library above

abi Counter {
    #[storage(read, write)]
    fn increment();

    #[storage(read)]
    fn count() -> u64;

    #[storage(read, write)]
    fn register(address_owner: Address, name: str[5]); 
    //using the fn register to take in the owners address and a preset name string of 
    //length 5 until can figure out alternative

    #[storage(read)]
    fn registered() -> str[5];

}

const OWNER = ~Address::from(0x9299da6c73e6dc03eeabcce242bb347de3f5f56cd1c70926d76526d7ed199b8b);
// const owner is set, not sure why but this will be replaced with the msg sender

storage {
    counter: u64 = 0,
    domains: StorageMap<Address, str[5]> = StorageMap {},
    //create a domains mapping the address and the string
}

pub struct Address {
    value: b256,
}

impl Counter for Contract {
    #[storage(read)]
    fn count() -> u64 {
        storage.counter
    }

    #[storage(read)]
    fn registered() -> str[5] {
        storage.domains.get(OWNER)
    }

    #[storage(read, write)]
    fn increment() {
        storage.counter = storage.counter + 1;
    }

    #[storage(read, write)]
    fn register(name: str[5]) {
        // Note: The return type of `msg_sender()` can be inferred by the
        // compiler. It is shown here for explicitness.
        let sender: Result<Identity, AuthError> = msg_sender();
        let sender: Address = match sender.unwrap() {
            Identity::Address(addr) => {
                assert(addr == OWNER);
                addr
            },
            _ => revert(0),
        };
        storage.domains.insert(address_owner, "hello")

    }   
}
