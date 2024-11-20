FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder 
WORKDIR /Application
COPY ["backend/backend.csproj", "backend/"]
RUN dotnet restore "backend/backend.csproj"
COPY . ./
RUN dotnet publish "backend/backend.csproj" -c Release -o output

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /Application
COPY --from=builder /Application/output .
ENTRYPOINT ["dotnet", "backend.dll"]