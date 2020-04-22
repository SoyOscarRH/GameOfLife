use rand::prelude::*;
use std::convert::TryInto;
use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

include!("cell.rs");

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
    changes: Vec<u32>,
    survive_min: u8,
    survive_max: u8,
    birth_min: u8,
    birth_max: u8,
    alive_now: usize,
}

#[wasm_bindgen]
impl Universe {
    fn index(&self, row: u32, col: u32) -> usize {
        (row * self.width + col).try_into().unwrap()
    }
    fn count_alive_around(&self, row: u32, col: u32) -> u8 {
        let mut count = 0;
        for delta_row in &[0, 1, self.height - 1] {
            for delta_col in &[0, 1, self.width - 1] {
                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (col + delta_col) % self.width;
                count += self.get(neighbor_row, neighbor_col) as u8;
            }
        }

        return count - self.get(row, col) as u8;
    }

    pub fn get(&self, row: u32, col: u32) -> Cell {
        self.cells[self.index(row, col)]
    }
    pub fn alive_now(&self) -> usize {
        self.alive_now
    }
    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    pub fn changes(&self) -> *const u32 {
        self.changes.as_ptr()
    }

    pub fn how_many_changes(&self) -> usize {
        self.changes.len()
    }

    pub fn set(&mut self, row: u32, col: u32, value: Cell) {
        let index = self.index(row, col);
        self.cells[index] = value;
    }

    pub fn toggle_cell(&mut self, row: u32, column: u32) {
        let index = self.index(row, column);
        self.cells[index].toggle();
    }

    pub fn tick(&mut self) {
        let mut next = self.cells.clone();
        let mut changes = vec![];

        let mut current = 0;

        for row in 0..self.height {
            for col in 0..self.width {
                let cell = self.get(row, col);
                let live_neighbors = self.count_alive_around(row, col);

                let next_cell = match (cell, live_neighbors) {
                    (Cell::Alive, live_neighbors) if live_neighbors < self.survive_min => Cell::Dead,
                    (Cell::Alive, live_neighbors) if live_neighbors > self.survive_max => Cell::Dead,
                    (Cell::Alive, _) => Cell::Alive,

                    (Cell::Dead, live_neighbors) if live_neighbors < self.birth_min => Cell::Dead,
                    (Cell::Dead, live_neighbors) if live_neighbors > self.birth_max => Cell::Dead,
                    (Cell::Dead, _) => Cell::Alive,
                };

                if next_cell != cell {
                    changes.push(row);
                    changes.push(col);
                }

                if next_cell == Cell::Alive {
                    current += 1
                }

                next[self.index(row, col)] = next_cell;
            }
        }

        self.alive_now = current;
        self.changes = changes;
        self.cells = next;
    }

    pub fn create(width: u32, height: u32, density: f64, s_min: u8, s_max: u8, b_min: u8, b_max: u8) -> Universe {
        let mut rng = rand::thread_rng();
        let cells: Vec<Cell> = (0..width * height)
            .map(|_| if rng.gen::<f64>() < density { Cell::Alive } else { Cell::Dead })
            .collect();

        let alive_now = cells.iter().filter(|&&c| c == Cell::Alive).count();

        Universe {
            width,
            height,
            cells,
            survive_min: s_min,
            survive_max: s_max,
            birth_min: b_min,
            birth_max: b_max,
            alive_now,
            changes: vec![],
        }
    }

    pub fn default_start(width: u32, height: u32, survive_min: u8, survive_max: u8, birth_min: u8, birth_max: u8) -> Universe {
        let cells: Vec<Cell> = (0..width * height)
            .map(|i| if i % 2 == 0 || i % 7 == 0 { Cell::Alive } else { Cell::Dead })
            .collect();

        let alive_now = cells.iter().filter(|&c| *c == Cell::Alive).count();

        Universe {
            width,
            height,
            cells,
            changes: vec![],
            survive_min,
            survive_max,
            birth_min,
            birth_max,
            alive_now,
        }
    }
}
