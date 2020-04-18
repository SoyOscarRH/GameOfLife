use rand::prelude::*;
use wasm_bindgen::prelude::*;

extern crate console_error_panic_hook;
use std::panic;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

impl Cell {
    fn toggle(&mut self) {
        *self = match *self {
            Cell::Dead => Cell::Alive,
            Cell::Alive => Cell::Dead,
        };
    }
}

#[wasm_bindgen]
pub struct Universe {
    width: usize,
    height: usize,
    cells: Vec<Cell>,
    survive_min: u8,
    survive_max: u8,
    birth_min: u8,
    birth_max: u8,
    alive_now: usize,
}

#[wasm_bindgen]
impl Universe {
    fn index(&self, row: usize, col: usize) -> usize {
        row * self.width + col
    }

    pub fn at(&self, row: usize, col: usize) -> Cell {
        self.cells[self.index(row, col)]
    }

    pub fn alive_now(&self) -> usize {
        self.alive_now
    }

    pub fn set(&mut self, row: usize, col: usize, value: Cell) {
        let index = self.index(row, col);
        self.cells[index] = value;
    }

    fn count_alive_around(&self, row: usize, col: usize) -> u8 {
        let mut count = 0;
        for delta_row in [0, 1, self.height - 1].iter().cloned() {
            for delta_col in [0, 1, self.width - 1].iter().cloned() {
                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (col + delta_col) % self.width;
                count += self.at(neighbor_row, neighbor_col) as u8;
            }
        }

        return count - self.at(row, col) as u8;
    }

    pub fn toggle_cell(&mut self, row: usize, column: usize) {
        let index = self.index(row, column);
        self.cells[index].toggle();
    }

    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    pub fn tick(&mut self) {
        let mut next = self.cells.clone();
        let mut current = 0;

        for row in 0..self.height {
            for col in 0..self.width {
                let cell = self.at(row, col);
                let live_neighbors = self.count_alive_around(row, col);

                let next_cell = match (cell, live_neighbors) {
                    (Cell::Alive, n) if self.survive_min <= n && self.survive_max >= n => Cell::Alive,
                    (Cell::Dead, n) if self.birth_min <= n && self.birth_max >= n => Cell::Alive,
                    (Cell::Alive, _) => Cell::Dead,
                    (Cell::Dead, _) => Cell::Dead,
                };
                if next_cell == Cell::Alive { current += 1; }

                next[self.index(row, col)] = next_cell;
            }
        }

        self.alive_now = current;
        self.cells = next;
    }

    pub fn create(width: usize, height: usize, density: f64, smin: u8, smax: u8, bmin: u8, bmax: u8) -> Universe {
        panic::set_hook(Box::new(console_error_panic_hook::hook));
        let mut rng = rand::thread_rng();
        let cells: Vec<Cell> = (0..width * height)
            .map(|_| {
                let val: f64 = rng.gen();
                if val < density {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();

        let alive_now = cells.iter().filter(|&c| *c == Cell::Alive).count();

        Universe {
            width,
            height,
            cells,
            survive_min: smin,
            survive_max: smax,
            birth_min: bmin,
            birth_max: bmax,
            alive_now
        }
    }

    pub fn default_start(width: usize, height: usize, smin: u8, smax: u8, bmin: u8, bmax: u8) -> Universe {
        panic::set_hook(Box::new(console_error_panic_hook::hook));
        let cells: Vec<Cell> = (0..width * height)
            .map(|i| {
                if i % 2 == 0 || i % 7 == 0 {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();

        let alive_now = cells.iter().filter(|&c| *c == Cell::Alive).count();

        Universe {
            width,
            height,
            cells,
            survive_min: smin,
            survive_max: smax,
            birth_min: bmin,
            birth_max: bmax,
            alive_now
        }
    }
}
