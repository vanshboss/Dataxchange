use ic_cdk::api::caller;
use ic_cdk_macros::*;
use std::cell::RefCell;
use std::collections::HashSet;
use candid::{CandidType, Principal};
use serde::Deserialize;

#[derive(CandidType, Deserialize, Clone)]
struct Dataset {
    id: u64,
    title: String,
    category: String,
    file: Vec<u8>,
    price: u64,
    owner: Principal,
    wallet_address: String,
    approved_buyers: HashSet<Principal>,
    pending_requests: HashSet<Principal>,
}

// New enum for request status
#[derive(CandidType, Deserialize, Clone)]
enum RequestStatus {
    Pending,
    Approved,
}

// New struct for a user's request
#[derive(CandidType, Deserialize, Clone)]
struct MyRequest {
    dataset_id: u64,
    title: String,
    status: RequestStatus,
}

thread_local! {
    static DATASETS: RefCell<Vec<Dataset>> = RefCell::new(Vec::new());
    static NEXT_ID: RefCell<u64> = RefCell::new(0);
}

#[update]
fn upload_dataset(
    title: String,
    category: String,
    file: Vec<u8>,
    price: u64,
    wallet: String
) -> Result<u64, String> {
    if file.len() > 4 * 1024 * 1024 {
        return Err("File too large. Max 4MB allowed.".to_string());
    }

    let id = NEXT_ID.with(|id| {
        let mut id_mut = id.borrow_mut();
        let current = *id_mut;
        *id_mut += 1;
        current
    });

    let dataset = Dataset {
        id,
        title,
        category,
        file,
        price,
        owner: caller(),
        wallet_address: wallet,
        approved_buyers: HashSet::new(),
        pending_requests: HashSet::new(),
    };

    DATASETS.with(|d| {
        d.borrow_mut().push(dataset);
    });

    Ok(id)
}

#[query]
fn get_all_datasets() -> Vec<(u64, String, String, u64, String, Principal)> {
    DATASETS.with(|d| {
        d.borrow()
            .iter()
            .map(|ds| (
                ds.id,
                ds.title.clone(),
                ds.category.clone(),
                ds.price,
                ds.wallet_address.clone(),
                ds.owner
            ))
            .collect()
    })
}

#[update]
fn request_access(dataset_id: u64) -> String {
    let user = caller();
    DATASETS.with(|d| {
        let mut datasets = d.borrow_mut();
        if let Some(ds) = datasets.iter_mut().find(|ds| ds.id == dataset_id) {
            if ds.owner == user {
                return "You are the owner.".to_string();
            }
            if ds.approved_buyers.contains(&user) {
                return "You already have access.".to_string();
            }
            ds.pending_requests.insert(user);
            return "Access request submitted. Awaiting seller approval.".to_string();
        }
        "Dataset not found.".to_string()
    })
}

#[query]
fn get_pending_requests(dataset_id: u64) -> Vec<Principal> {
    let owner = caller();
    DATASETS.with(|d| {
        let datasets = d.borrow();
        if let Some(ds) = datasets.iter().find(|ds| ds.id == dataset_id && ds.owner == owner) {
            return ds.pending_requests.iter().cloned().collect();
        }
        vec![]
    })
}

#[update]
fn approve_buyer(dataset_id: u64, buyer: Principal) -> String {
    let owner = caller();
    DATASETS.with(|d| {
        let mut datasets = d.borrow_mut();
        if let Some(ds) = datasets.iter_mut().find(|ds| ds.id == dataset_id && ds.owner == owner) {
            if ds.pending_requests.remove(&buyer) {
                ds.approved_buyers.insert(buyer);
                return "Buyer approved.".to_string();
            } else {
                return "Buyer was not in pending requests.".to_string();
            }
        }
        "Dataset not found or you are not the owner.".to_string()
    })
}

#[query]
fn view_dataset(dataset_id: u64) -> Result<Vec<u8>, String> {
    let user = caller();
    DATASETS.with(|d| {
        let datasets = d.borrow();
        if let Some(ds) = datasets.iter().find(|ds| ds.id == dataset_id) {
            if ds.owner == user || ds.approved_buyers.contains(&user) {
                return Ok(ds.file.clone());
            } else {
                return Err("Access denied. Request access and wait for approval.".to_string());
            }
        }
        Err("Dataset not found.".to_string())
    })
}

#[query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

// New function to check if a user has access to a dataset
#[query]
fn has_access(dataset_id: u64) -> bool {
    let user = caller();
    DATASETS.with(|datasets| {
        let datasets_ref = datasets.borrow();
        if let Some(dataset) = datasets_ref.iter().find(|ds| ds.id == dataset_id) {
            return dataset.approved_buyers.contains(&user);
        }
        false
    })
}

// New function to get a user's requests
#[query]
fn get_my_requests() -> Vec<MyRequest> {
    let user = caller();
    DATASETS.with(|datasets| {
        let datasets_ref = datasets.borrow();
        datasets_ref
            .iter()
            .filter_map(|dataset| {
                if dataset.approved_buyers.contains(&user) {
                    Some(MyRequest {
                        dataset_id: dataset.id,
                        title: dataset.title.clone(),
                        status: RequestStatus::Approved,
                    })
                } else if dataset.pending_requests.contains(&user) {
                    Some(MyRequest {
                        dataset_id: dataset.id,
                        title: dataset.title.clone(),
                        status: RequestStatus::Pending,
                    })
                } else {
                    None
                }
            })
            .collect()
    })
}


#[init]
fn init() {
    ic_cdk::println!("Canister initialized");
}