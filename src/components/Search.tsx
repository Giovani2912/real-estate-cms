"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/trpc/client";
import PropertyListing from "./PropertyListing";
import { FilterIcon, Search } from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatCurrency } from "@/lib/formatCurrency";
import PropertyReel from "./PropertyReel";

const Searcher = () => {
  const [neighborhood, setNeighborhood] = useState("");
  const [debouncedNeighborhood, setDebouncedNeighborhood] = useState("");

  const [filters, setFilters] = useState<{
    bathrooms?: number;
    bedrooms?: number;
    suites?: number;
    parkcar?: number;
    value?: number;
  }>({});

   // Filtros efetivamente aplicados
   const [appliedFilters, setAppliedFilters] = useState(filters)
  // Atualiza `neighborhood`
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNeighborhood(event.target.value);
  };

  // Atualiza filtros
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value ? Number(value) : "", // Converte para número, ou string vazia caso o campo esteja vazio
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  };

  // Debounce para evitar requisições a cada tecla
  useEffect(() => {
    const handler = setTimeout(() => {
      if (neighborhood.length >= 3) {
        setDebouncedNeighborhood(neighborhood);
      } else {
        setDebouncedNeighborhood("");
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [neighborhood]);

  const { data: properties, isLoading, error } =
    trpc.getFilteredProperties.useQuery(
      {
        neighborhood: debouncedNeighborhood,
        ...filters,
      },
      {
        enabled: debouncedNeighborhood.length >= 3,
      }
    );

    const handleClearFilters = () => {
      setFilters({});
      setAppliedFilters({});
    };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Buscar seu imóvel</h1>

      <div className="flex gap-4 items-center justify-center py-6">
        <div className="flex gap-2 items-center justify-center border-2 border-gray-200 p-1 rounded-md shadow-sm focus-within:border-gray-300 focus-within:ring-1 focus-within:ring-gray-300 w-full">
          <input
            type="text"
            placeholder="Digite o nome de um bairro (mín. 3 letras)"
            value={neighborhood}
            onChange={handleInputChange}
            className="border rounded p-2 w-full border-none outline-none"
          />
          <Search className="text-gray-400" />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="flex gap-2 items-center justify-center py-6"
              disabled={neighborhood.length < 3}
            >
              <FilterIcon size={20} />
              Filtros
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex items-center justify-center flex-col gap-4 p-2">
              <input
                type="number"
                name="bathrooms"
                placeholder="Mínimo de Banheiros"
                value={filters.bathrooms ?? "" }
                onChange={(e) =>
                  setFilters({ ...filters, bathrooms: Number(e.target.value) })
                }
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                name="bedrooms"
                placeholder="Mínimo de Quartos"
                value={filters.bedrooms ?? ""}
                onChange={(e) =>
                  setFilters({ ...filters, bedrooms: Number(e.target.value) })
                }
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                name="suites"
                placeholder="Mínimo de Suítes"
                value={filters.suites ?? ""}
                onChange={(e) =>
                  setFilters({ ...filters, suites: Number(e.target.value) })
                }
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                name="parkcar"
                placeholder="Mínimo de Vagas"
                value={filters.parkcar ?? ""}
                onChange={(e) =>
                  setFilters({ ...filters, parkcar: Number(e.target.value) })
                }
                className="border p-2 rounded w-full"
              />
              <Select
                value={filters.value?.toString() ?? ""}
                onValueChange={(val) =>
                  setFilters((prev) => ({ ...prev, value: Number(val) }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Preço máximo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100000">{formatCurrency(100000)}</SelectItem>
                  <SelectItem value="300000">{formatCurrency(300000)}</SelectItem>
                  <SelectItem value="500000">{formatCurrency(500000)}</SelectItem>
                  <SelectItem value="1000000">{formatCurrency(1000000)}</SelectItem>
                  <SelectItem value="5000000">{formatCurrency(5000000)}</SelectItem>
                  <SelectItem value="10000000">{formatCurrency(10000000)}</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="w-full"
              >
                Limpar Filtros
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Select>
          <SelectTrigger className="w-[200px] py-6">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Menor valor</SelectItem>
            <SelectItem value="asc">Maior valor</SelectItem>
            <SelectItem value="new">Mais novo</SelectItem>
            <SelectItem value="area">Maior Área</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading && <PropertyReel  query={{ sort: "desc", limit: 8 }} /> }
      {error && <p>Erro ao buscar imóveis: {error.message}</p>}

      {properties && properties.length > 0 ? (
        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8 py-6">
          {properties.map((property) => (
            <PropertyListing key={property.id} property={property} index={0}>
              {property.title || "Sem Título"} - Bairro: {property.bairro}
            </PropertyListing>
          ))}
        </div>
      ) : properties && properties.length === 0 ? (
        <p className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl py-6">
          :( Nenhum imóvel encontrado com esses filtros...
        </p>
      ) : null}
    </div>
  );
};

export default Searcher;
