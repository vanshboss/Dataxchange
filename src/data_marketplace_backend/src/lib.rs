use ic_cdk::api::caller;
use ic_cdk_macros::*;
use std::cell::RefCell;
use std::collections::{HashSet};
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

thread_local! {
    static DATASETS: RefCell<Vec<Dataset>> = RefCell::new(Vec::new());
    static NEXT_ID: RefCell<u64> = RefCell::new(0);
}

#[query]
fn get_all_datasets() -> Vec<(u64, String, String,  u64, String, Principal)> {
    DATASETS.with(|d| {
        d.borrow().iter().map(|ds| {
            (ds.id, ds.title.clone(),ds.category.clone(), ds.price, ds.wallet_address.clone(), ds.owner)
        }).collect()
    })
}

#[update]
fn upload_dataset(title: String, category: String,file: Vec<u8>, price: u64, wallet: String) ->Result<u64, String>  {
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
fn view_dataset(dataset_id: u64) ->Result<Vec<u8>, String>  {
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
// src/data_marketplace_backend/src/lib.rs

use ic_cdk::query;
use ic_cdk_macros::*;

/// A basic query method exposed in your Candid .did file
#[query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[init]
fn init() {
    ic_cdk::println!("Canister initialized");
}
