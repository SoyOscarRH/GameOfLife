use wasm_bindgen::prelude::*;

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

#[wasm_bindgen]
pub struct Universe {
    width: usize,
    height: usize,
    cells: Vec<Cell>,
}

#[wasm_bindgen]
impl Universe {
    fn index(&self, row: usize, col: usize) -> usize {
        row * self.width + col
    }

    fn at(&self, row: usize, col: usize) -> Cell {
        self.cells[self.index(row, col)]
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

    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let cell = self.at(row, col);
                let live_neighbors = self.count_alive_around(row, col);
                let next_cell = match (cell, live_neighbors) {
                    (Cell::Alive, 0) | (Cell::Alive, 1) => Cell::Dead,
                    (Cell::Alive, 2) | (Cell::Alive, 3) => Cell::Alive,
                    (Cell::Alive, _) => Cell::Dead,
                    (Cell::Dead, 3) => Cell::Alive,
                    (Cell::Dead, _) => Cell::Dead,
                };

                next[self.index(row, col)] = next_cell;
            }
        }

        self.cells = next;
    }

    pub fn create(width: usize, height: usize) -> Universe {
        let cells = (0..width * height)
            .map(|i| {
                if i % 2 == 0 || i % 7 == 0 {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();

        Universe {
            width,
            height,
            cells,
        }
    }
}
